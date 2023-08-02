export enum PERMISSIONS {
  // ADMIN
  MASTER = 'MASTER',

  // STORE
  CREATE_STORE = 'CREATE_STORE',
  UPDATE_STORE = 'UPDATE_STORE',
  DELETE_STORE = 'DELETE_STORE',
  LIST_STORES = 'LIST_STORES',
  STORE_DETAILED = 'STORE_DETAILED',
  CREATE_OWN_STORE = 'CREATE_OWN_STORE',

  // SELLER
  CREATE_SELLER = 'CREATE_SELLER',
  UPDATE_SELLER = 'UPDATE_SELLER',
  DELETE_SELLER = 'DELETE_SELLER',
  SELLER_DETAILS = 'SELLER_DETAILS',
  LIST_SELLERS = 'LIST_SELLERS',

  // PRODUCT
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  LIST_PRODUCTS = 'LIST_PRODUCTS',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',

  // REPORT
  MONTHLY_REVENUE = 'MONTHLY_REVENUE',
  WEEKLY_REVENUE = 'WEEKLY_REVENUE',
  DAILY_REVENUE = 'DAILY_REVENUE',

  // CUSTOMER
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  LIST_CUSTOMERS = 'LIST_CUSTOMERS',
  CUSTOMER_DETAILS = 'CUSTOMER_DETAILS',

  // ROLES
  CREATE_ROLE = 'CREATE_ROLE',
  LIST_ROLE = 'LIST_ROLE',
}
