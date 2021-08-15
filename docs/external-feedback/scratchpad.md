# External Feedback API Notes

### Protocol

There should be a protocol in place between the UTML client
and the external feedback generator. 

What does the UTML client send? Most likely this be the serialised diagram as JSON.

What does the external feedback tool send back? Should these be
messages, similar to `FeedbackMessage`? Should the external tool be able to highlight 
certain parts of the diagram? In that case, would the external tool alter the serialised
diagram or should this be the responsibility of the UTML client? 

### External Tool Selection

It should of course be possible to use any number of external feedback generators, including no external feedback generator.
This raises questions about selection of external tool. Probably an icon in the navbar that should open
a modal in which you can select one of the external feedback tools. These external tools
should be probably be 'hard-coded' into the UTML source. It would be too much effort to provide
admin management functionality for them and store them in the database as the addition of
external tools will be highly infrequent at most. 

### Triggering External Feedback

When should the external feedback tool be queried? Unlike local feedback, the API requests
will be too expensive to do on every detected change. Most likely a button in the navbar that
only shows up when the an external feedback tool is selected should be pressed by the user
to request external feedback. 

