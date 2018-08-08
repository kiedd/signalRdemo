using System.Threading.Tasks;

namespace signalRdemo.Implementation
{
  public interface IHubClient{
    Task BroadcastMessage(string type, string payload);
  }
}