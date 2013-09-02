({
    baseUrl: "../source",
    dir: "../built/",
    keepBuildDir: false,
    generateSourceMaps: true,
    optimize: "closure",
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'SEVERE',
        avoidGlobals: true
    },
    
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
    
    /*
    wrap: {
        start: "(function(o) {var l='weswit/';var define = function(c,a,d){for(var b=0;b<a.length;b++)a[b]=l+a[b];o(l+c,a,d)};",
        end: "}(define));"
    },
    */
    
    preserveLicenseComments: false
})