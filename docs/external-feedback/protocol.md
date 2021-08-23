# Protocol Specification External Feedback

### Request
The client sends the a `POST` request to the url of the external API.
This request must contain a body containing adhering to the following specification:
```
{
  diagram: SerialisedDiagram,
  additionalParamters?: { [key: string]: string }
}
```
The `diagram` field must contain the serialised version of the diagram. The `additionalParameters`
field is intentionally left rather vague. External feedback APIs may use this field
to request any additional data they may need.

### Response
The external feedback API will send back a response with the a body according
to the following specification:
```
{
  status: 'success' | 'warning' | 'error',
  errorMessage?: string,
  feedback?: Feedback,
  diagram?: SerialisedDiagram
}
```
- `status` - If everything went well, the value will be `'success'`. 
`'warning'` is sent when something did no go perfectly but the API can still provide feedback.
`error` is sent when the API could for whatever reason not provide feedback.
- `errorMessage` - Optional error message that can be displayed to the user upon a `status` of `'error;` or `'warning'`.
- `feedback` - The actual feedback. This field must be set unless the `status === 'error'`
- 'diagram' - An optional parameter. If this parameter is set, the client will deserialise the diagram
and set it as the active diagram.