/// <reference path="../../../typings/tsd.d.ts" />
namespace Views {

    export class Page extends Session.BaseView {

        title: KnockoutObservable<string>;
        layout: Controls.MasterLayout;

        constructor() {
            super();
            const self = this;
            if (self.init()) {
                console.log("MENU");                
                self.isViewLoaded = ko.observable(false);
                self.layout= new Controls.MasterLayout();
            }
        }

        getCount(data: any) {
            if (data.search.isLoaded()) {
                return data.search.pageButtons.length;
            } else {
                return 0;
            }
        }

        init() {
            const self = this;

            self.appContext.addEventListener(
                Models.Events.dataLoaded, (arg: any) => {
                    self.dataLoaded();
                });

            self.appContext.addEventListener(
                Models.Events.notificationsLoaded, (arg: any) => {
                    self.dataLoaded2();
                });

            self.appContext.addEventListener(
                Models.Events.searchLoaded, (arg: any) => {
                    self.searchLoaded();
                });

            return true;
        }

        //Responses.
        isEventCalled_DataLoaded: boolean = false;
        dataLoaded() {
            const self = this;
            console.log("isEventCall_DataLoaded is :", self.isEventCalled_DataLoaded);
            self.layout.databind(
                self.appContext.payloadMenu,
                self.appContext.payloadUser);           
        }

        dataLoaded2() {
            const self = this;
            console.log("dataloaded2");
            self.layout.addOtherElements();
            self.layout.addNotificationPanels();
        }
        // Search
        searchLoaded() {
            const self = this;
            console.log("methodCalled:searchLoaded");
            self.layout.header.leftControl.searchControl.handlerReady();
            //self.layout.searchTemp.init();
            ko.applyBindings(self);
        }
        isViewLoaded: KnockoutObservable<boolean>;
    }

    export class SearchContext extends Session.BaseView {

        constructor() {
            super(); this.createChildControls();
        }

        databind() {
            const self = this;
            // self.appContext.payloadSearch.results.filter()
        }

        createChildControls() {
            const self = this;

            $("#q").focus(function () {
                $(".search-result-popout").addClass("active");
                $("body").addClass("search-active")
            });
            $(".search-active-background").click(function () {
                $(".search-result-popout").removeClass("active");
                $("body").removeClass("search-active")
            });
        }

    }

    // ToDo: Re-factor this entire object. Most likely go down a namespace. Class name is wrong. The elements seem to be assosicated to search.
    export class PageButtons {
        search: JQuery;
        searchButton: JQuery;
        buttonToggle: JQuery;
        parent: Views.Controls.MasterLayout;
        constructor(ref: Views.Controls.MasterLayout) {
            const self = this;
            self.parent = ref;
            self.search = $("#search-box");
            self.searchButton = $("#trigger-search");
            self.buttonToggle = $("#btn-toggle");
            console.log(self.buttonToggle);
            console.warn("ARE YOU CALL:ING ME")
            self.init();
        }
        init() {
            const self = this;
            self.buttonToggle.on("click", (evt: any) => {   
                self.parent.toggle();            
            });            
            self.searchButton.on("click", (evt: any) => {     
                self.search.addClass("active");     
                $("body").addClass("search-active");
                $(".search-result-popout").addClass("active"); 
                self.parent.header.leftControl.searchControl.triggerEvent();                
            });
        }
    }
}

declare var screenfull: any;
var toggleFullScreen = () => {
    if (screenfull.enabled) {
        if (!screenfull.isFullscreen) {
            screenfull.request();
        } else {
            screenfull.exit();
        }
    }
}

var onClickTest = function(){
    console.log("test");
}
$(document).ready(() => {
    console.warn("ready");
    $("#layout-static .static-content-wrapper").append(
        "<div class='extrabar-underlay'></div>");

    const app = new Views.Page();

    $("#q").focus(function () {
        $(".search-result-popout").addClass("active");
        $("body").addClass("search-active")
    });
    $(".search-active-background").click(function () {
        $(".search-result-popout").removeClass("active");
        $("body").removeClass("search-active")
    });

    //ko.applyBindings(app);

});
// // Clean up loader
$(window).load(() => {
    setTimeout(() => {
        $('.page-loader').addClass('fadeOut animated-500').on('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function () {
            $(".page-loader").remove();
        });
    }, 1900);
    setTimeout(() => {
        $(".page-content").removeClass("m-hide");
    }, 2000);
    // Pop overs
    let options = {
        html: true
    }
    for (let i = 1; i < 4; i++) {
        switch (i) {
            case 1:
                for (let k = 0; k < 5; k++) {
                    $(`#menu${i}_link${k}`).popover(options);
                }
                break;
            case 2:
                for (let k = 0; k < 4; k++) {
                    $(`#menu${i}_link${k}`).popover(options);
                }
                break;
            case 3:
                for (let k = 0; k < 1; k++) {
                    $(`#menu${i}_link${k}`).popover(options);
                }
                break;
        }
    }
});
