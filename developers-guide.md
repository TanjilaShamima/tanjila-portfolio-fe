
project-name/
│
├── src/
│   ├── @store/                   
|   |   |--authStore # try to name it by feature
│   │   └── index.ts              
│   │
│   ├── features/                
│   │   ├── authentication/       # Feature module for user authentication
│   │   │   ├── components    # Authentication related components
│   │   │   ├── hooks          # Hooks related to authentication
|   |   |   ├── utils          # Authentication related utility functions
|   |   |   ├── services       # Authentication api calls
|   |       ├── types          # Authentication related types(TypeScript)
│   │   │   └── icons          # Icons for auth feature, if there is any
|   |   |   |__ static         # For static content like heading text, paragraph etc
|   |   |           
│   │   └── ...
│   │
|   ├── @components    # Global components
|   ├── @icons/@assets # Global Icons
|   ├── @hooks         # Global custom hooks
|   ├── @utils         # Global util functions
|   ├── pages          # Routing
|   ├── axiosInstance  # Axios configuration
|   ├── @types          # Global types(TypeScript)
│   └── ...
└── ...


## Explanation:

Note: The symbol `@` denotes a global scope when used with a directory.

`/@components`: Contains global, reusable UI components such as headers, footers, buttons, etc., used across various pages.

`/@hooks`: Houses custom hooks intended for global use.

`/@utils`: Provides global utility functions.

`/@icons`: Stores global icons.

`/features`: This directory contains specific features of the application, like user profile management and posts handling. Each feature module is self-contained with its components, hooks, and utilities.

`/app`: Reflects the application's routing structure. Each subdirectory corresponds to a page (e.g., Home, Profile), organizing components specific to that page.


## Decision Framework:
When deciding where to place a new piece of the authentication feature or any other feature, consider the following questions:

### Is it a Route? 
If yes, it belongs in the pages directory.
### Is it Reusable Across Features or Pages?
If yes, place it in the features directory under the appropriate feature module.
### Is it Specific to a Single Page? 
If a component or piece of logic is only relevant to a single page and not reused elsewhere, consider keeping it within that page's scope, either directly in the page's file or in a closely associated directory within pages.


## Where to keep types(TypeScript)
Aim to define types as close to their usage context as possible. For instance, declare a component's Props type at the top of its file. If a type is utilized across an entire feature, place it in a types directory within that feature. For types with global scope, store them in a central @types directory. Otherwise, retain the type definition within the same file where it's used.