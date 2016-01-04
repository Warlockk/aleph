
var loadSearchResult = ['$http', '$q', '$route', 'Query', 'Session',
  function($http, $q, $route, Query, Session) {
  var dfd = $q.defer();
  Session.get().then(function(session) {
    var query = angular.copy(Query.load());
    query['_uid'] = session.cbq;
    query['limit'] = Query.mode() == 'table' ? 30 : 0;
    $http.get('/api/1/query', {params: query}).then(function(res) {
      var result = res.data;
      result.sources.labels = {};
      for (var i in res.data.sources.values) {
        var src = res.data.sources.values[i];
        result.sources.labels[src.id] = src.label;
      }
      dfd.resolve(result);
    });
  });
  return dfd.promise;
}];
