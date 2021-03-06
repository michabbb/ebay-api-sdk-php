'use strict';

var grunt = require('grunt');
var path = require('path');
var helper = require('./helpers');

exports.transform = {
    setUp: function (callback) {
        this.ebay = grunt.file.readJSON('test/fixtures/ebay.json');
        this._ = grunt.util._;
        this.eBayTypes = [
            'AnotherType',
            'Base64BinaryType',
            'BooleanType',
            'ComplexType',
            'DecimalType',
            'DoubleType',
            'IntegerType',
            'StringType',
            'TokenType',
            'URIType'
        ];

        this.eBayEnums = [
            'EnumStringType',
            'EnumTokenType'
        ];

        this.eBayNoCallsEnums = [
            'NoCalls'
        ];

        callback();
    },

    phpClassesForEBayTypesAreGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(this.eBayTypes.length);

        /*
         * For each eBay type a php class file will be generated in the directory
         * <service name>/<service version>/src/DTS/eBaySDK/<service name>/Types/<type name>.php
         */
        this._.forEach(this.eBayTypes, function (type) {
            helper.phpClassForEBayTypeIsGenerated(type);
        });

        test.done();
    },

    phpUnitsForEBayTypesAreGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(this.eBayTypes.length);

        /*
         * For each eBay type a phpunit file will be generated in the directory
         * <service name>/<service version>/test/DTS/eBaySDK/<service name>/Types/<type name>Test.php
         */
        this._.forEach(this.eBayTypes, function (type) {
            helper.phpUnitForEBayTypeIsGenerated(type);
        });

        test.done();
    },

    phpClassesForEBayEnumsAreGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(this.eBayEnums.length);

        /*
         * For each eBay enum a php class file will be generated in the directory
         * <service name>/<service version>/src/DTS/eBaySDK/<service name>/Enums/<enum name>.php
         */
        this._.forEach(this.eBayEnums, function (name) {
            helper.phpClassForEBayEnumIsGenerated(name);
        });

        test.done();
    },

    phpClassesForNoCallsEBayEnumsAreNotGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(this.eBayNoCallsEnums.length);

        /*
         * For each eBay enum where each value is 'NoCalls', no php class file will be generated in the directory
         * <service name>/<service version>/src/DTS/eBaySDK/<service name>/Enums/<enum name>.php
         */
        this._.forEach(this.eBayNoCallsEnums, function (name) {
            helper.phpClassForEBayEnumIsNotGenerated(name);
        });

        test.done();
    },

    phpUnitsForEBayEnumsAreGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(this.eBayEnums.length);

        /*
         * For each eBay enum a phpunit file should be generated in the directory
         * <service name>/<service version>/test/DTS/eBaySDK/<service name>/Enums/<type name>Test.php
         */
        this._.forEach(this.eBayEnums, function (name) {
            helper.phpUnitForEBayEnumIsGenerated(name);
        });

        test.done();
    },

    phpClasseForEBayServiceIsGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(1);

        /*
         * For the eBay service a php class file will be generated in the directory
         * <service name>/<service version>/src/DTS/eBaySDK/<service name>/Services/<service name>.php
         */
        helper.phpClassForEBayServiceIsGenerated();

        test.done();
    },

    phpUnitForEBayServiceIsGenerated: function (test) {
        helper.test = test;
        helper.service = this.ebay.services[0];
        test.expect(1);

        /*
         * For the eBay service a phpunit file will be generated in the directory
         * <service name>/<service version>/test/DTS/eBaySDK/<service name>/Services/<service name>.php
         */
        helper.phpUnitForEBayServiceIsGenerated();

        test.done();
    }
};
