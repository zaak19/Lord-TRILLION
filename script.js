/* =====================================================
   CHANGEMENT FRANÇAIS / ANGLAIS
===================================================== */

const langBtn =
    document.getElementById("langBtn");


let lang = "fr";


function setLanguage(nextLanguage) {

    lang = nextLanguage;


    document.documentElement.lang =
        lang;


    document
        .querySelectorAll("[data-fr]")
        .forEach(element => {

            element.textContent =
                element.getAttribute(
                    `data-${lang}`
                );

        });


    langBtn.textContent =
        lang === "fr"
            ? "EN"
            : "FR";
}


langBtn.addEventListener(
    "click",
    () => {

        setLanguage(
            lang === "fr"
                ? "en"
                : "fr"
        );

    }
);



/* =====================================================
   ANNÉE AUTOMATIQUE
===================================================== */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();



/* =====================================================
   SYSTÈME DE PUBLICATIONS D'IMAGES
===================================================== */

const input =
    document.getElementById(
        "postInput"
    );


const grid =
    document.getElementById(
        "postsGrid"
    );


const clearBtn =
    document.getElementById(
        "clearPosts"
    );


const KEY =
    "trillion-software-posts";



function getPosts() {

    try {

        return JSON.parse(
            localStorage.getItem(KEY)
            || "[]"
        );

    } catch {

        return [];

    }

}



function savePosts(posts) {

    localStorage.setItem(
        KEY,
        JSON.stringify(posts)
    );

}



/* Affichage des publications */

function renderPosts() {

    grid.innerHTML = "";


    getPosts().forEach(
        (src, index) => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "post";


            article.innerHTML = `

                <img
                    src="${src}"
                    alt="Publication Trillion Software"
                >

                <div class="post-caption">

                    Trillion Software
                    • Publication ${index + 1}

                </div>

            `;


            grid.appendChild(
                article
            );

        }
    );

}



/* Ajout d'images */

input.addEventListener(
    "change",
    async () => {

        const current =
            getPosts();


        for (
            const file
            of input.files
        ) {

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                continue;

            }


            const reader =
                new FileReader();


            reader.onload =
                event => {

                    current.push(
                        event.target.result
                    );


                    savePosts(
                        current
                    );


                    renderPosts();

                };


            reader.readAsDataURL(
                file
            );

        }


        input.value = "";

    }
);



/* Effacer les publications */

clearBtn.addEventListener(
    "click",
    () => {

        const message =
            lang === "fr"
                ? "Effacer toutes tes publications sur cet appareil ?"
                : "Clear all your posts on this device?";


        if (
            confirm(message)
        ) {

            localStorage.removeItem(
                KEY
            );


            renderPosts();

        }

    }
);



/* Premier affichage */

renderPosts();



/* =====================================================
   SERVICE WORKER
===================================================== */

if (
    "serviceWorker"
    in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator
                .serviceWorker
                .register("sw.js")
                .catch(
                    error =>
                        console.log(
                            "Service Worker:",
                            error
                        )
                );

        }
    );

}