import Laabr from 'laabr';

export default {
  plugin: Laabr,
  options: {
    colored: true,
    formats: {
      onPostStart: ':time[iso] [:level] :message at: :host[uri]',
      onPostStop: ':time[iso] [:level] :message at: :host[uri]',
      log: ':time[iso] [:level] :tags :message',
      request: ':time[iso] [:level] :message',
      response:
        ':time[iso] [:level] :method :url :status :payload (:responseTime ms)',
      uncaught:
        ':time[iso] [:level] :method :url :payload :error[source] :error[stack]',
      'request-error':
        ':time[iso] [:level] :method :url :payload :error[message] :error[stack]'
    }
  }
};
