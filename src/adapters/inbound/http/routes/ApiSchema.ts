type SearchKeySchema = {
    [key: string]: string
}

type BaseParamsSchema = {
    type: string
  default?: string
  description?: string
}

type BodySchema = {
  [key: string]: BaseParamsSchema
}

type BaseSchema = {
  pic: string
  search: SearchKeySchema
  additional_body?: BodySchema
}

type BaseProperty = {
  type : string | string[];
  properties? : BaseObjectSchema;
  items? : BaseProperty;
  nullable?: boolean;
}

type BaseObjectSchema = {
  [key: string] : BaseProperty
}

type ArrayOfObject = BaseObjectSchema[];
type ArrayOfString = string[];
type ArrayOfNumber = number[];

type BaseResponseSchema  = {
  type: "Array of Object" | "Boolean" | "Array of Number" | "Object" | "Array of String" | "Dynamic Key Object" | "String" | "File";
  message?: BaseObjectSchema | ArrayOfNumber | ArrayOfString | ArrayOfObject | boolean;
}


export const BasePaginationRequestSchema = ({ pic, search, additional_body }: BaseSchema) => {
  const baseSchema = {
    type: "object",
    description: `PIC: ${pic}`,
    properties: { //Default values are provided as an example
      search: { type: "string", description: `Search is required but can be an empty string, Example of search properties: ${JSON.stringify(search)}` },
      limit: { type: "integer" },
      lastId: { type: "integer" },
      sort: { type: "string", description: "ASC/DESC. Default is DESC if value is not provided" },
    },
    // additionalProperties: true, //Additional properties that are extending from base request (e.g., orderBy)
  }

  if (additional_body !== undefined) {
    if (Object.keys(additional_body).length != 0) {
      // Add custom property to schema
      baseSchema.properties = { ...baseSchema.properties, ...additional_body }
    }
  }

  return baseSchema
};

type BodySchemaHelper = {
  type : string;
  description : string;
  properties : {
      [key : string] : BaseParamsSchema | {isFile : boolean}
  }
}

//Request schema for non pagination.
export const BaseRequestSchema = (pic: string, requestBodyProperties: BodySchema) => {
  const BaseRequestSchema : BodySchemaHelper = {
    type: "object",
    description: `PIC: ${pic}`,
    properties: {} //Example: limit: { type: "integer", default: 500 }
  }

  for(let data in requestBodyProperties){
    if(requestBodyProperties[data].type == "file"){
        BaseRequestSchema.properties[data] = { isFile : true}
    }else{
      BaseRequestSchema.properties[data] = requestBodyProperties[data]
    }
  }
  
  return BaseRequestSchema
}

export const AuthHeadersJsonSchema = {
  type: "object",
  properties: {
    Authorization: { type: "string" },
    mmbsecret: { type: "string" },
  },
  required: ["Authorization", "mmbsecret"],
};

//example of querystringSchema
export const queryStringJsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    excitement: { type: "integer" },
  },
};

//example of parameterSchema
export const paramsJsonSchema = {
  type: "object",
  properties: {
    par1: { type: "string" },
    par2: { type: "number" },
  },
};

const ErrorSchema = {
  statusCode: { type: "integer" },
  code: { type: "string" },
  error: { type: "string" },
  message: { type: "string" }
}

const errorResponse = {
  401: {
    description: "Unauthorized response",
    type: "object",
    properties: ErrorSchema
  },
  400: {
    description: "Bad Request response",
    type: "object",
    properties: ErrorSchema
  },
  500: {
    description: "Internal Server Error response",
    type: "object",
    properties: ErrorSchema
  }
}

//Result schema for pagination
export const BasePaginationResultSchema = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          // Data below could be an array with array as items, or an array with object as items
          data: {
            description: "type of data is array of array, in child array can contain string, number, object, null, boolean",
            type: "array",
            items : {
              type : "array",
              anyOf: [
                {
                  type: "array",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "integer" },
                      { type: "boolean" },
                      { type: "object", additionalProperties: true },
                    ],
                  },
                },
              ],
            }
          },
          column: {
            type: "array",
            items: {
              type: "string",
            },
          },
          hasNext: { type: "integer" },
        },
      },
    },
  },
  ...errorResponse
}

export const BasePaginationRequestSchema2LastId = ({ pic, search, additional_body }: BaseSchema) => {
  const baseSchema = {
    type: "object",
    description: `PIC: ${pic}`,
    properties: { //Default values are provided as an example
      search: { type: "string", description: `Search is required but can be an empty string, Example of search properties: ${JSON.stringify(search)}` },
      limit: { type: "integer" },
      lastId1: { type: "integer" },
      lastId2 : {type : "integer"},
      sort: { type: "string", description: "ASC/DESC. Default is DESC if value is not provided" },
    },
    // additionalProperties: true, //Additional properties that are extending from base request (e.g., orderBy)
  }

  if (additional_body !== undefined) {
    if (Object.keys(additional_body).length != 0) {
      // Add custom property to schema
      baseSchema.properties = { ...baseSchema.properties, ...additional_body }
    }
  }

  return baseSchema
};

export const BasePaginationResultLastId2Schema = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      message: {
        type: "object",
        properties: {
          // Data below could be an array with array as items, or an array with object as items
          data: {
            description: "type of data is array of array, in child array can contain string, number, object, null, boolean",
            type: "array",
            items : {
              type : "array",
              anyOf: [
                {
                  type: "array",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "integer" },
                      { type: "boolean" },
                      { type: "object", additionalProperties: true },
                    ],
                  },
                },
              ],
            }
          },
          column: {
            type: "array",
            items: {
              type: "string",
            },
          },
          hasNext1: { type: "integer" },
          hasNext2 : { type : "integer"}
        },
      },
    },
  },
  ...errorResponse
}


export const BaseResultSchema = {
  200: {
    description: "Successful response",
    type: "object",
    properties: {
      message: {
        type: "array",
        items: {
          type: "object",
          properties: {
            plat: {
              type: "integer"
            },
            order_no: {
              type: "string"
            },
            platform: {
              type: "string"
            },
            type: {
              type: "string"
            },
            account: {
              type: "integer"
            },
            time: {
              type: "integer"
            }
          }
        }
      }
    }
  },
  ...errorResponse
}
/*
    type disini adalah tipe data dari message
    Pilihan type Array of Object, Boolean, Array of Number, Object, Array of String
    type harus diisi sesuai
*/

/**
 * Base Schema.
 *
 *      type disini adalah tipe data dari message
 *      Pilihan type Array of Object, Boolean, Array of Number, Object, Array of String
 *      type harus diisi sesuai.
 *
 */
export const BaseResponse = ({type , message} : BaseResponseSchema) => {
  let sub;
  
  if(type == "String"){
    sub = {
      type : "string"
    }
  } else if(type == "Array of Object" && typeof message != 'boolean' && typeof message != 'string' ){
      sub =  {
          type : "array",
          items : {
              type : "object",
              properties : {
                  ...message
              }
          } 
      }
  }else if(type == "Boolean"){
      sub = {
        type : "boolean"
      }
  }else if(type == "Array of String"){
      sub = {
          type : "array",
          items : {
              type : "string"
          }
      }
  }else if(type == "Array of Number"){
      sub = {
          type : "array",
          items : {
              type : "number"
          }
      }
  }else if(type == "Object" && typeof message != 'boolean' && typeof message != 'string'){
      sub = {
          type : "object",
          properties : {
              ...message
          }
      }
  } else if (type == "Dynamic Key Object" && typeof message != 'boolean' && typeof message != 'string') {
    sub = {
      type: "object",
      additionalProperties: {
        ...message
      }
    }
  } else if(type == 'File') {
    return {
      200: {},
      ...errorResponse
    }
  }

  let schema = {
      200 : {
          type : "object",
          properties : {
              message : sub
          }
      },
      ...errorResponse
  }

  return schema;
}