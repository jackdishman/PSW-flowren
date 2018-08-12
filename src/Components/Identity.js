/*
    Are concerned with how things look.
    May contain both presentational and container components** inside, and usually have some DOM markup and styles of their own.
    Often allow containment via this.props.children.
    Have no dependencies on the rest of the app, such as Flux actions or stores.
    Don’t specify how the data is loaded or mutated.
    Receive data and callbacks exclusively via props.
    Rarely have their own state (when they do, it’s UI state rather than data).
    Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
    Examples: Page, Sidebar, Story, UserInfo, List.
*/
