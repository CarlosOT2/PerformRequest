async function formatMessage(reqMsg, res, res_json) {
    const formattedMessage = { ...reqMsg }
    for (let key in formattedMessage) {
        if (typeof (formattedMessage[key]) === 'string') {
            formattedMessage[key] = formattedMessage[key].replace(/{'status'}/, res.status)
            formattedMessage[key] = formattedMessage[key].replace(/{'res.info'}/, res_json.info)
        }
    }
    return formattedMessage
}

async function handleReturn(req, reqMsg, res, res_json) {
    const formatted_msg = await formatMessage(reqMsg, res, res_json)
    return new Promise((resolve, reject) => {

        let returnedValue;
        if (req.return === 'res.ok') {
            returnedValue = res.ok
        }
        if (req.return === 'res_json') {
            returnedValue = res_json
        }
        if (req.return === 'res') {
            returnedValue = res
        }
        if (res.ok && res.status >= 200 && res.status <= 299) {
            if (formatted_msg.success) {
                console.log(formatted_msg.success)

                if (reqMsg.alert_success) {
                    alert(formatted_msg.success)
                }
            }
            resolve(returnedValue)
        } else {
            reject({
                object: new Error(formatted_msg.error),
                returnedValue: returnedValue
            })
        }
    })
}

export async function PerformRequest(req) {
    const reqFetch = req.fetch
    const reqMsg = req.message
    const reqFunction = {
        success: req.function?.success || function () { },
        error: req.function?.error || function () { },
        finally: req.function?.finally || function () { }
    }

    try {
        const options = {
            method: reqFetch.method || 'GET',
            headers: reqFetch.headers || {},
            body: reqFetch.body || null
        }

        const res = await fetch(reqFetch.url, options)
        const res_json = await res.json()

        const return_value = await handleReturn(req, reqMsg, res, res_json)
        
        await reqFunction.success(res_json)
        return return_value
    } catch (error) {
        const error_obj = error.object || error
        await reqFunction.error(error_obj)

        console.error(error_obj)
        if (reqMsg.alert_error) {
            alert(error_obj.message)
        }
        return error.returnedValue
    } finally {
        await reqFunction.finally()
    }
}
