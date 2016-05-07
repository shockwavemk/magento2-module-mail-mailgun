/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
require([
    'underscore',
    'jquery',
    'prototype'
], function (_, $) {

    var mailgunKey = $( "#system_smtp_mailgun_key" );
    var mailgunDomains = $("#system_smtp_mailgun_domain");

    var newOptions = {
        "Option 1": "value1",
        "Option 2": "value2",
        "Option 3": "value3"
    };

    mailgunKey.change(function() {

        var mailgunKeyValue = mailgunKey.val();

        new Ajax.Request('/management/mailgun/ajax/domains', {
            evalScripts: true,
            parameters: {'form_key': FORM_KEY, 'mailgun_key': mailgunKeyValue},
            onSuccess: function(transport) {

                var json = transport.responseText.evalJSON();
                mailgunDomains.empty(); // remove old options
                $.each(json, function(key,value) {
                    mailgunDomains.append($("<option></option>")
                        .attr("value", value.label).text(value.value));
                });


            }.bind(this)
            //onFailure: this._processFailure.bind(this)
        });

    });

    return {

        $mailgunKey: $('#system_smtp_mailgun_key'),

        /**
         * Switch Weight
         * @returns {*}
         */
        switchWeight: function () {
            return this.productHasWeight() ? this.enabled() : this.disabled();
        },

        /**
         * Notify product weight is changed
         * @returns {*|jQuery}
         */
        notifyProductWeightIsChanged: function () {
            return $('input:checked', this.$weightSwitcher).trigger('change');
        },

        /**
         * Change
         * @param {String} data
         */
        change: function (data) {
            var value = data !== undefined ? +data : !this.productHasWeight();

            $('input[value=' + value + ']', this.$weightSwitcher).prop('checked', true);
        },

        /**
         * Constructor component
         */
        'Shockwavedesign_Mail_Mailgun/js/mailgun': function () {
            this.bindAll();
            this.switchWeight();
        },

        /**
         * Bind all
         */
        bindAll: function () {
            this.$mailgunKey.find('input').on('change', this.switchWeight.bind(this));
        }
    };

});