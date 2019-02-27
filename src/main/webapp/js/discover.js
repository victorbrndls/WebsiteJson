let CATEGORY_IDS = {
    PRODUCT_HUNT: "PRODUCT_HUNT",
    REDDIT: "REDDIT",
    TWITTER: "TWITTER"
};

let Discover = (function ($) {
    let functions = {};

    /**
     * Displays the modules from the corresponding category
     * @param categoryID one from CATEGORY_IDS
     */
    functions.displayCategory = function (categoryID) {
        getModulesFromCategory(categoryID, (modules) => {
            let container = $("#category-display");
            container.children().remove();

            modules.forEach((mod) => {
                let moduleElement = createModuleElement(mod);
                container.append(moduleElement);
            });

            DiscoverUI.displayCategoryDisplay(true);
        });
    };

    function getModulesFromCategory(categoryID, cb) {
        $.get("/api/category", {category: categoryID}).done((data) => {
            cb(data.data);
        });
    }

    functions.openModuleEndpoint = function (moduleId) {
        window.open(`/module/${moduleId}`);
    };

    /**
     * Creates HTMLElement from Module object
     * @param mod
     * @return {*|HTMLElement}
     */
    function createModuleElement(mod) {
        let el = `
        <div class="category-module" onclick="Discover.displayModuleDocumentation(${mod.id})">
            <span>${mod.name}</span>
            <br>
            <span class="module-description">${mod.description}</span>                   
        </div>
        `;

        return $(el);
    }

    functions.displayModuleDocumentation = function (modId) {
        requestModuleInformation(modId, (data) => {
            $("#module-info-name").text(data.name);
            $("#module-info-description").text(data.description);
            $("#module-info-id").text(`${window.location.host}/module/${data.id}`);

            DiscoverUI.displayCategoryDisplay(false);
        });
    };

    /**
     * Returns information about the module such as the module name, the descrption, the url and more information about it.
     * @param modId
     * @param cb
     */
    function requestModuleInformation(modId, cb) {
        $.get("/api/category/module", {moduleId: modId}).done((data) => {
            if (data.error === "NONE") {
                cb(data.data);
            } else {
                alert("Invalid request to /api/category/module");
            }
        });
    }


    return functions;
})(jQuery);

/**
 * This is like an util class for the discover page, it has some functions used to control the UI
 */
let DiscoverUI = (function ($) {
    let functions = {};

    /**
     * @param display if {true} shows the #category-display div, if {false} shows the #category-module-info div
     */
    functions.displayCategoryDisplay = function (display) {
        if (display) {
            $("#category-display").show();
            $("#category-module-info").hide();
        } else {
            $("#category-display").hide();
            $("#category-module-info").show();
        }
    }

    return functions;
})(jQuery);

function temp_makePostForElement(id) {
    $.post(`/module/${id}`, {a: 2, b: 4}, (data) => {
        $("#category-display").append("<span>" + JSON.stringify(data) + "</span><br>");
    });
}

function temp_switchContainer() {
    let d = $("#category-display");
    let m = $("#category-module-info");

    if (d.is(":visible")) {
        d.hide();
        m.show();
    } else {
        d.show();
        m.hide();
    }

}