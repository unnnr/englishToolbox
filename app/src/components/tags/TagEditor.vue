<template>
	<request-form 
		ref="form"
		:submitCallback="submit"
		@input:incorrect="handleError">

		<transition-group name="tags" class="tags" ref="tags">
			<h4 class="editor__label tags__title text-fourth" :key="-2">
				<span>
						Add tags
						<small class="editor__counter">{{ tagsCounter }}</small>
				</span>
				<small class="editor__error">{{ errorMessage }}</small>
			</h4>

			<new-tag-input
				ref="input"
				:key="-1"
				:submit="forceSubmit"/>

			<button
				class="tag"
				type="button"
				
				v-context:items="contextMenu"
				v-for="(tag) of sortedTags"

				:key="tag.id"
				:class="{ 'tag--main': tag.main, 'tag--created': tag.created }"
				:style="{ 'background-color': tag.selected ? tag.color : ''}"
				
				@click="toggle(tag)"
				@click.right="createContext(tag)">

				<span class="tag__name" for="cb2">{{ tag.label }}</span>
			</button>
		</transition-group>
	</request-form>
</template>

<script>

import NewTagInput from '@components/tags/NewTagInput'
import RequestForm from '@components/RequestForm'
import Tags from '@models/Tags'
import bus from '@services/eventbus';

const MAX_TAGS_COUNT = 5;
const MAX_CREATED_TAGS_COUNT = 30;

export default {
	components: {
		RequestForm,
		NewTagInput
	},

	data: function () {
		return {
			selectedCount: 0,

			main: null,
			tags: [],

			errorMessage: '',

			contextMenu: [
					{ label: 'Set as main', action: () => {} }
			]
		}
	},

	computed: {
		tagsCounter() {
			return this.selectedCount + '/' + MAX_TAGS_COUNT;
		},

		sortedTags() {
			let sorted = [];

			for (let tag of this.tags)
			{
				if (tag.created)
					sorted.unshift(tag);
				else
					sorted.push(tag);
			}

			return sorted;
		},

		selected: {
			get() {
				let selected = [];

				for (const tag of this.tags)
				{
					if (tag.selected && !!!tag.main)
						selected.push(tag);
				}

				return [...selected];
			},

			set(tags) {
				if (tags.length > MAX_TAGS_COUNT - 1) // -1 Cause 1 is reserved for main tag
					return;
				
				for (let tag of this.selected)
					tag.selected = false;

				for (let { id } of tags)
				{
					let tag = this.getTagById(id);

					this.$set(tag, 'selected', true);
				}

				this.selectedCount = tags.length;
			}
		}
	},

	watch: {
		main(newTag, oldTag) {   
			if (oldTag)
				this.$set(oldTag, 'main', false);

			if (newTag && !!!newTag.selected)
			{
				if (this.selectedCount >= MAX_TAGS_COUNT)   
					return false;

				this.$set(newTag, 'selected', true);
				this.selectedCount++;
			}

			if (newTag)
				this.$set(newTag, 'main', true);
		}
	},

	mounted() {
		Tags.all().then((tags) => {
			this.clear()
			this.tags = tags;
		});
	},

	methods: {
		clear() {
			this.main = null;
			this.selectedCount = 0;
			this.tags = [];
		},

		getTagById(id) {
			for (const tag of this.tags)
			{
				if (tag.id === id)
					return tag;
			}

			return null;
		},

		createContext(tag) {
			const SET_AS_MAIN = 0;
			const DELETE = 1;

			if (tag.main)
			{
					this.contextMenu[SET_AS_MAIN].label = 'Make default';
					this.contextMenu[SET_AS_MAIN].action = () => {
							this.main = null; 
					}
			}
			else
			{
				this.contextMenu[SET_AS_MAIN].label = 'Set as main';
				this.contextMenu[SET_AS_MAIN].action = () => {

				if (tag.selected)
				{
					this.main = tag;
					return;
				}          

				if (this.toggle(tag))
					this.main = tag; 
				}
			}        
		},

		toggle(tag) {
			let currentState = tag.selected;

			if (!!!currentState)
			{
				if (this.selectedCount >= MAX_TAGS_COUNT)
					return false;

				if (!!!this.main)
						this.main = tag;
			}
			else
			{
				if (tag.main)
					this.main = null;
			}

			this.$set(tag, 'selected', !!!currentState);
			this.selectedCount += currentState ? -1 : 1;
			
			return true;
		},

		remove(tag) {
			let tagIndex = this.createdTags.indexOf(tag);

			this.createdTags.splice(tagIndex, 1);
		},

		getFormData() {
			let input = this.$refs.input;
			let label = input.label.trim();

			let data = new FormData();
			let color = '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0');
			
			data.append('label', label);
			data.append('color',  color);
		
			return data;	
		},

		handleError(errors) {
			this.errorMessage = errors.label.join('. ');
		},

		validate() {
			let label = this.$refs.input.label.trim();

			return label.length === 0 || this.selectedCount >= MAX_CREATED_TAGS_COUNT
		},

		forceSubmit() {
			this.$refs.form.send();
		},

		async submit(event) {
			if (!!!this.validate)
				return;

			let data = this.getFormData();
			let newTag = await Tags.create(data)
			
			this.newLabel = '';
			this.errorMessage = '';
			this.tags.push({ ...newTag, created: true });

			bus.dispatch('tag-created', { tag: newTag });
		}
	}
}
</script>

<style scoped>

.tags-enter
{
    transform: scale(0.5);
    opacity: 0;
}

.tags-enter-active
{
    transition: 
        transform .3s ease-in-out,
        opacity .4s ease-in-out;
}

</style>


<style scoped>

.tag:before {
    width: 0;
    margin-right: 0;
    content:'';
    transform: scale(0);
    transition: 
        transform .2s ease-in-out, 
        margin-right .2s ease-in-out, 
        width .2s ease-in-out;
}

.tag--main:before {
    width: 15px;
    margin-right: 5px;
    content: "star";
    transform: scale(1);
}

</style>
