
const ViodeSender = new function() {
    
    function init()
    {
        form = document.querySelector('.selected__editor');

        form.addEventListener('submit', async event => {
            event.preventDefault();

            let responce = await send();

            if (responce.ok)
                recieve(await responce.json());
            // else
            //  Error.show(12);
        });
    }

    function send()
    {
        let formData = new FormData(form);
        let method  = form.getAttribute('method');
        let url  = form.getAttribute('action');

        return fetch(url, {
            method: method,
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        });
    }

    function recieve(responce)
    {
        ViodesPool.add(responce);
    }

    let form;

    init();
}(); 

const ViodesPool = new function()
{
    function init()
    {
        pool = document.querySelector('.pool')
    }


    this.add = function (data)
    {
        console.log(data);
        pool.insertAdjacentHTML('afterbegin', `
        <div class="post-card post-card--rectangle">
          <div class="post-card__image">
            <div class="post-card__header">
              <button class="post-card__favorite-button">
                <span class="post-card__favorite-icon post-card__favorite-icon--active material-icons-round">favorite</span>
              </button>
              <div class="post-card__views">
                <span class="post-card__views-icon material-icons-round">visibility</span>
                <span class="post-card__views-count">1337</span>
              </div>
            </div>
            <div class="post-card__title heading-fifth">${ data.title }</div>
          </div>
          <div class="post-card__text text-third">${ data.description ?? ''  }</div>
          <div class="post-card__footer">
            <div class="tag">
              <div class="tag__icon">
                <div class="tooltip tag__tooltip">
                  <div class="tooltip__arrow"></div>
                  <div class="tag">
                    <div class="tag__icon"></div>
                    <span class="tag__name">tag name</span>
                  </div>
                </div>
              </div>
              <div class="tag__icon">
                <div class="tooltip tag__tooltip">
                  <div class="tooltip__arrow"></div>
                  <div class="tag">
                    <div class="tag__icon"></div>
                    <span class="tag__name">tag name</span>
                  </div>
                </div>
              </div>
              <div class="tag__icon"></div>
              <span class="tag__name">tag name</span>
            </div>
            <span class="post-card__date">July 19 2020</span>
          </div>
        </div>
    `);
    }

    let pool;

    init();
}();

const VideoPlayer = new function ()
{
    this.showEditor = function ()
    {

    }

    this.showViode = function ()
    {

    }
}
