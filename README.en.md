# PerformRequest #
Perform requests to APIs in a structured way.
<br/>
the response returned by the API must be in JSON format,
<br/>
otherwise the function won't be able to parse it.

<h3> Properties </h3>
  <ul>
    <li><b>fetch;</b> contains fetch options, same as regular fetch.
      <ul>
        <li><b>method;</b> request method</li>
        <li><b>headers;</b> request headers</li>
        <li><b>body;</b> request body</li>
        <li><b>url;</b> request url</li>
      </ul>
    </li>
    <li><b>message;</b> message displayed at end of the request
      <ul>
        <li><b>success (string);</b> message displayed in the console if request is successful</li>
        <li><b>error (string);</b> message displayed in the console if request fails</li>
        <li><b>alert_error (boolean);</b> displays error message using <i>alert()</i></li>
        <li><b>alert_success (boolean);</b> displays success message using <i>alert()</i></li>
        <li><b>response;</b> you can display specific values from the response in the message. to configure which values can be displayed,
        </br>
        go to src/PerformRequest.js, inside the formatMessage function, you'll find the values that can be displayed.
        </br>
        example; the message <code>`{'status'} - {'res.info'}`</code> is the same as <code>`${res.status} - ${res_json.info}`</code>
          <ul>
            <li><b>{'status'}</b> = res.status</li>
            <li><b>{'res.info'}</b> = res_json.info</li>
          </ul>
        </li>
      </ul>
    </li> 
    <li><b>function (optional);</b> functions executed during the request — each of these properties must receive a function
      <ul>
        <li><b>success;</b> executed if request is successful, receives the response in JSON format as an argument</li>
        <li><b>error;</b> executed if request fails, receives an object error as an argument</li>
        <li><b>finally;</b> executed at the end of the request, regardless of success or failure. does not receive any arguments</li>
      </ul>
    </li>
    <li><b>return (optional);</b> value returned by PerformRequest() function. uses keywords to define the value returned.
      <ul>
        <li><b>'res.ok'</b> returns res.ok</li>
        <li><b>'res_json'</b> returns response parsed from JSON to a object</li>
        <li><b>'res'</b> returns unparsed response</li>
      </ul>
    </li>
  </ul>
</br>
Function usage example;

```javascript
const req = await PerformRequest({
  fetch: {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    url: `url`,
  },
  message: {
    success: `status.{'status'} - {'res.info'}`,
    error: `status.{'status'} - {'res.info'}`,
    alert_error: true,
    alert_success: true
  },
  function: {
    success: async (res_json) => { 
      console.log('success')
    },
    error: async (error) => {
      console.error(error)
    },
    finally: async () => {
      console.log('final')
    }
  },
  return: 'res.ok'
})
```