using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace signalRdemo.Implementation
{
    public class MyHub : Hub<IHubClient>
    {
    }
}