using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using signalRdemo.Implementation;

namespace signalRdemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private IHubContext<MyHub, IHubClient> _hubContext;

        public ValuesController(IHubContext<MyHub, IHubClient> hubContext)
        {
            this._hubContext = hubContext;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Message msg)
        {
            Console.WriteLine($"got message {msg.Payload}");
            _hubContext.Clients.All.BroadcastMessage(msg.Type, msg.Payload);
        }
    }
}
