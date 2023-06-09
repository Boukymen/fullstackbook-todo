
export const AllTableDataConfig = [
    {
        id: 1,
        tableName: "Product",
        filtrableColumns: [
            {
                name: "id",
                type: "number",
                label: "ID",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "Product",
                description: "id for product table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: false,
            },
            {
                name: "productCode",
                type: "string",
                label: "product Code",
                value: "",
                operator:[{label: "equals", value: "equals", selected: true}],
                tableName: "Product",
                description: "product code for product table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            }
        ],
    },
    {
        id: 2,
        tableName: "ProductForecast",
        filtrableColumns: [
            {
                name: "id",
                type: "number",
                label: "ID",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "ProductForecast",
                description: "id for product forecast table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: false,
            },
            {
                name: "productCode",
                type: "string",
                label: "product Code",
                value: "",
                operator:[{label: "equals", value: "equals", selected: true}],
                tableName: "ProductForecast",
                description: "product code for product forecast table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            },
            {
                name: "date",
                type: "date",
                label: "Date",
                value: "",
                value2: "",
                operator: [{label: "equals", value: "equals", selected: true},
                    {label: "greater than", value: "greater than", selected: false},
                    {label: "less than", value: "less than", selected: false},
                    {label: "between", value: "between", selected: false}],
                tableName: "ProductForecast",
                description: "date for product order history table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            }
        ],
    },
    {
        id: 3,
        tableName: "ProductOrderHistory",
        filtrableColumns: [
            {
                name: "id",
                type: "number",
                label: "ID",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "ProductOrderHistory",
                description: "id for product order history table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: false,
            },
            {
                name: "productCode",
                type: "string",
                label: "product Code",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "ProductOrderHistory",
                description: "product code for product order history table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            },
            {
                name: "supplierName",
                type: "string",
                label: "supplier Name",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "ProductOrderHistory",
                description: "supplier name for product order history table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            },
            {
                name: "entryDate",
                type: "date",
                label: "entry Date",
                value: "",
                value2: "",
                operator: [{label: "equals", value: "equals", selected: true},
                    {label: "greater than", value: "greater than", selected: false},
                    {label: "less than", value: "less than", selected: false},
                    {label: "between", value: "between", selected: false}],
                tableName: "ProductOrderHistory",
                description: "entry Date for product order history table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            }
        ],

    },
    {
        id: 4,
        tableName: "Supplier",
        filtrableColumns: [
            {
                name: "id",
                type: "number",
                label: "ID",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "Supplier",
                description: "id for supplier table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: false,
            },
            {
                name: "name",
                type: "string",
                label: "name",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "Supplier",
                description: "name for supplier table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            }
        ],
    },
    {
        id: 5,
        tableName: "Site",
        filtrableColumns: [
            {
                name: "id",
                type: "number",
                label: "ID",
                value: "",
                operator:[{label: "equals", value: "equals", selected: true}],
                tableName: "Site",
                description: "id for site table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: false,
            },
            {
                name: "name",
                type: "string",
                label: "name",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "Site",
                description: "name for site table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            }
        ],

    },
    {
        id: 6,
        tableName: "Store",
        filtrableColumns: [
            {
                name: "id",
                type: "number",
                label: "ID",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "Store",
                description: "id for store table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: false,
            },
            {
                name: "storeNumber",
                type: "string",
                label: "store Number",
                value: "",
                operator: [{label: "equals", value: "equals", selected: true}],
                tableName: "Store",
                description: "store number for store table",
                options: [],
                isRequired: false,
                isDisabled: false,
                isSelected: false,
                isMulti: false,
                isClearable: true,
                isSearchable: true,
                isSortable: false,
                isFilterable: true,
                isGroupable: false,
                isOrderable: true,
            }
        ]

    },

]

export const Order = [
    'ASC', 'DESC'
]
