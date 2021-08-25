import { JsStrObj, Results, sendGet, SparqlClientImpl } from '@agentlab/sparql-jsld-client';

export default class SparqlClient extends SparqlClientImpl {
  async loadNs() {
    const url = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces';
    const response = await sendGet(url);
    if (response.status < 200 && response.status > 204) return Promise.reject('Cannot get namespaces');
    const ns: JsStrObj = {};
    if (response.data && response.data.results) {
      let results: Results = { bindings: [] };
      results = response.data.results;
      if (results) {
        results.bindings.forEach((b) => {
          if (b.prefix && b.namespace && b.prefix.value && b.namespace.value) {
            ns[b.prefix.value] = b.namespace.value;
          }
        });
      }
    }
    ns['sesame'] = 'http://www.openrdf.org/schema/sesame#';
    return ns;
  }
}
