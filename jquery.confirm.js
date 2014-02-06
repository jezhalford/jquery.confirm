/*!
 * jquery.confirm
 *
 * @version 2.0.2
 *
 * @author My C-Labs
 * @author Matthieu Napoli <matthieu@mnapoli.fr>
 * @author Russel Vela
 * @author Jez Halford <jez@jhdw.co.uk>
 *
 * @license MIT
 * @url http://myclabs.github.io/jquery.confirm/
 */
(function ($) {

    /**
     * Confirm a link or a button
     * @param options {title, text, confirm, cancel, confirmButton, cancelButton, post}
     */
    $.fn.confirm = function (options) {
        if (typeof options === 'undefined') {
            options = {};
        }

        if(typeof options.confirmButton === 'string') {
            options.confirmButton = {value : options.confirmButton}
        }

        if(typeof options.cancelButton === 'string') {
            options.cancelButton = {value : options.cancelButton}
        }

        this.click(function (e) {
            e.preventDefault();

            var newOptions = $.extend({
                button: $(this)
            }, options);

            $.confirm(newOptions, e);
        });

        return this;
    };

    /**
     * Show a confirmation dialog
     * @param options {title, text, confirm, cancel, confirmButton, cancelButton, post}
     */
    $.confirm = function (options, e) {
        // Default options
        var settings = $.extend(true, {
            text: "Are you sure?",
            title: "",
            confirmButton: {
                value : "Yes",
                classAttr : "btn-primary"
            },
            cancelButton: {
                value : "Cancel",
                classAttr : "btn-default"
            },
            post: false,
            confirm: function (o) {
                var url = e.currentTarget.attributes['href'].value;
                if (options.post) {
                    var form = $('<form method="post" class="hide" action="' + url + '"></form>');
                    $("body").append(form);
                    form.submit();
                } else {
                    window.location = url;
                }
            },
            cancel: function (o) {
            },
            button: null
        }, options);

        // Modal
        var modalHeader = '';
        if (settings.title !== '') {
            modalHeader =
                '<div class=modal-header>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '<h4 class="modal-title">' + settings.title+'</h4>' +
                '</div>';
        }
        var modalHTML =
                '<div class="confirmation-modal modal fade" tabindex="-1" role="dialog">' +
                    '<div class="modal-dialog">' +
                        '<div class="modal-content">' +
                            modalHeader +
                            '<div class="modal-body">' + settings.text + '</div>' +
                            '<div class="modal-footer">' +
                                '<button class="confirm btn ' + settings.confirmButton.classAttr +
                                '" type="button" data-dismiss="modal">' +
                                    settings.confirmButton.value +
                                '</button>' +
                                '<button class="cancel btn ' + settings.cancelButton.classAttr +
                                '" type="button" data-dismiss="modal">' +
                                    settings.cancelButton.value +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

        var modal = $(modalHTML);

        modal.on('shown', function () {
            modal.find(".btn-primary:first").focus();
        });
        modal.on('hidden', function () {
            modal.remove();
        });
        modal.find(".confirm").click(function () {
            settings.confirm(settings.button);
        });
        modal.find(".cancel").click(function () {
            settings.cancel(settings.button);
        });

        // Show the modal
        $("body").append(modal);
        modal.modal('show');
    };

})(jQuery);
