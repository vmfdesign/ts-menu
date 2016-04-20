namespace Views.Controls.Components {
    export class RightMenu {
        el: JQuery;
        constructor() {
            const self = this;
            self.el = $("<ul/>",{class: "nav navbar-nav toolbar pull-right"});

            self.el.append('<li class="toolbar-icon-bg appear-on-search ov-h" id="trigger-search-close"><a class="toggle-fullscreen" id="button-search-close"><span class="icon-bg"><i class="material-icons">close</i></span><div class="ripple-container"></div></a> </li>');

            self.el.append(
                Components.Utilities.StringTemplates.rightMenuFullScreen);
             self.el.append(
                Components.Utilities.StringTemplates.otherMenuItem);
            self.el.append(
                Components.Utilities.StringTemplates.notificationMenuItem);
        }
        render() {
            const self = this;
            $("#button-toggle-fullscreen").on("click", (event: any) => {
                console.log("this");
            });
            return self.el;
        }
        onclickFullScreen(event: any) {
            if (screenfull.enabled) {
                if (!screenfull.isFullscreen) {
                    screenfull.request();
                } else {
                    screenfull.exit();
                }
            }
        }
    }
    declare var screenfull: any;
}