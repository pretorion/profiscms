/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.data.Field
 * <p>This class encapsulates the field definition information specified in the field definition objects
 * passed to {@link Ext.data.Record#create}.</p>
 * <p>Developers do not need to instantiate this class. Instances are created by {@link Ext.data.Record.create}
 * and cached in the {@link Ext.data.Record#fields fields} property of the created Record constructor's <b>prototype.</b></p>
 */
Ext.data.Field = Ext.extend(Object, {
    
    constructor : function(config){
        if(Ext.isString(config)){
            config = {name: config};
        }
        Ext.apply(this, config);
        
        var types = Ext.data.Types,
            st = this.sortType,
            t;

        if(this.type){
            if(Ext.isString(this.type)){
                this.type = Ext.data.Types[this.type.toUpperCase()] || types.AUTO;
            }
        }else{
            this.type = types.AUTO;
        }

        // named sortTypes are supported, here we look them up
        if(Ext.isString(st)){
            this.sortType = Ext.data.SortTypes[st];
        }else if(Ext.isEmpty(st)){
            this.sortType = this.type.sortType;
        }

        if(!this.convert){
            this.convert = this.type.convert;
        }
    },
    
    /**
     * @cfg {String} name
     * The name by which the field is referenced within the Record. This is referenced by, for example,
     * the <code>dataIndex</code> property in column definition objects passed to {@link Ext.grid.ColumnModel}.
     * <p>Note: In the simplest case, if no properties other than <code>name</code> are required, a field
     * definition may consist of just a String for the field name.</p>
     */
    /**
     * @cfg {Mixed} type
     * (Optional) The data type for automatic conversion from received data to the <i>stored</i> value if <code>{@link Ext.data.Field#convert convert}</code>
     * has not been specified. This may be specified as a string value. Possible values are
     * <div class="mdetail-params"><ul>
     * <li>auto (Default, implies no conversion)</li>
     * <li>string</li>
     * <li>int</li>
     * <li>float</li>
     * <li>boolean</li>
     * <li>date</li></ul></div>
     * <p>This may also be specified by referencing a member of the {@link Ext.data.Types} class.</p>
     * <p>Developers may create their own application-specific data types by defining new members of the
     * {@link Ext.data.Types} class.</p>
     */
    /**
     * @cfg {Function} convert
     * (Optional) A function which converts the value provided by the Reader into an object that will be stored
     * in the Record. It is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><b>v</b> : Mixed<div class="sub-desc">The data value as read by the Reader, if undefined will use
     * the configured <code>{@link Ext.data.Field#defaultValue defaultValue}</code>.</div></li>
     * <li><b>rec</b> : Mixed<div class="sub-desc">The data object containing the row as read by the Reader.
     * Depending on the Reader type, this could be an Array ({@link Ext.data.ArrayReader ArrayReader}), an object
     *  ({@link Ext.data.JsonReader JsonReader}), or an XML element ({@link Ext.data.XMLReader XMLReader}).</div></li>
     * </ul></div>
     * <pre><code>
// example of convert function
function fullName(v, record){
    return record.name.last + ', ' + record.name.first;
}

function location(v, record){
    return !record.city ? '' : (record.city + ', ' + record.state);
}

var Dude = Ext.data.Record.create([
    {name: 'fullname',  convert: fullName},
    {name: 'firstname', mapping: 'name.first'},
    {name: 'lastname',  mapping: 'name.last'},
    {name: 'city', defaultValue: 'homeless'},
    'state',
    {name: 'location',  convert: location}
]);

// create the data store
var store = new Ext.data.Store({
    reader: new Ext.data.JsonReader(
        {
            idProperty: 'key',
            root: 'daRoot',
            totalProperty: 'total'
        },
        Dude  // recordType
    )
});

var myData = [
    { key: 1,
      name: { first: 'Fat',    last:  'Albert' }
      // notice no city, state provided in data object
    },
    { key: 2,
      name: { first: 'Barney', last:  'Rubble' },
      city: 'Bedrock', state: 'Stoneridge'
    },
    { key: 3,
      name: { first: 'Cliff',  last:  'Claven' },
      city: 'Boston',  state: 'MA'
    }
];
     * </code></pre>
     */
    /**
     * @cfg {String} dateFormat
     * <p>(Optional) Used when converting received data into a Date when the {@link #type} is specified as <code>"date"</code>.</p>
     * <p>A format string for the {@link Date#parseDate Date.parseDate} function, or "timestamp" if the
     * value provided by the Reader is a UNIX timestamp, or "time" if the value provided by the Reader is a
     * javascript millisecond timestamp. See {@link Date}</p>
     */
    dateFormat: null,
    
    /**
     * @cfg {Boolean} useNull
     * <p>(Optional) Use when converting received data into a Number type (either int or float). If the value cannot be parsed,
     * null will be used if useNull is true, otherwise the value will be 0. Defaults to <tt>false</tt>
     */
    useNull: false,
    
    /**
     * @cfg {Mixed} defaultValue
     * (Optional) The default value used <b>when a Record is being created by a {@link Ext.data.Reader Reader}</b>
     * when the item referenced by the <code>{@link Ext.data.Field#mapping mapping}</code> does not exist in the data
     * object (i.e. undefined). (defaults to "")
     */
    defaultValue: "",
    /**
     * @cfg {String/Number} mapping
     * <p>(Optional) A path expression for use by the {@link Ext.data.DataReader} implementation
     * that is creating the {@link Ext.data.Record Record} to extract the Field value from the data object.
     * If the path expression is the same as the field name, the mapping may be omitted.</p>
     * <p>The form of the mapping expression depends on the Reader being used.</p>
     * <div class="mdetail-params"><ul>
     * <li>{@link Ext.data.JsonReader}<div class="sub-desc">The mapping is a string containing the javascript
     * expression to reference the data from an element of the data item's {@link Ext.data.JsonReader#root root} Array. Defaults to the field name.</div></li>
     * <li>{@link Ext.data.XmlReader}<div class="sub-desc">The mapping is an {@link Ext.DomQuery} path to the data
     * item relative to the DOM element that represents the {@link Ext.data.XmlReader#record record}. Defaults to the field name.</div></li>
     * <li>{@link Ext.data.ArrayReader}<div class="sub-desc">The mapping is a number indicating the Array index
     * of the field's value. Defaults to the field specification's Array position.</div></li>
     * </ul></div>
     * <p>If a more complex value extraction strategy is required, then configure the Field with a {@link #convert}
     * function. This is passed the whole row object, and may interrogate it in whatever way is necessary in order to
     * return the desired data.</p>
     */
    mapping: null,
    /**
     * @cfg {Function} sortType
     * (Optional) A function which converts a Field's value to a comparable value in order to ensure
     * correct sort ordering. Predefined functions are provided in {@link Ext.data.SortTypes}. A custom
     * sort example:<pre><code>
// current sort     after sort we want
// +-+------+          +-+------+
// |1|First |          |1|First |
// |2|Last  |          |3|Second|
// |3|Second|          |2|Last  |
// +-+------+          +-+------+

sortType: function(value) {
   switch (value.toLowerCase()) // native toLowerCase():
   {
      case 'first': return 1;
      case 'second': return 2;
      default: return 3;
   }
}
     * </code></pre>
     */
    sortType : null,
    /**
     * @cfg {String} sortDir
     * (Optional) Initial direction to sort (<code>"ASC"</code> or  <code>"DESC"</code>).  Defaults to
     * <code>"ASC"</code>.
     */
    sortDir : "ASC",
    /**
     * @cfg {Boolean} allowBlank
     * (Optional) Used for validating a {@link Ext.data.Record record}, defaults to <code>true</code>.
     * An empty value here will cause {@link Ext.data.Record}.{@link Ext.data.Record#isValid isValid}
     * to evaluate to <code>false</code>.
     */
    allowBlank : true
});
