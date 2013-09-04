require({

    baseUrl: "../source",
    keepBuildDir: false,
    generateSourceMaps: true,
    optimize: "closure",
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'SEVERE',
        externs: [
          "externs.js"
        ],
        ignoreDefaultExterns: false,
        avoidGlobals: true
    },
    
    removeCombined: true,
    
    modules: [
      {
        name: "utility-toolkit",
        include: ["Inheritance",
              "List",
              "IllegalArgumentException",
              "IllegalStateException",
              "Environment",
              "Setter",
              "Matrix",
              "DoubleKeyMatrix",
              "DoubleKeyMap",
              "BrowserDetection",
              "Helpers",
              "EnvironmentStatus",
              "Executor",
              "ExecutorSimple",
              "EventDispatcher",
              "CookieManager",
              "Dismissable"]
      }
    ],
    
    preserveLicenseComments: false
})