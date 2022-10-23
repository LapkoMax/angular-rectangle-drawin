using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface IJsonService
    {
        Task<string> ReadJsonAsync();

        Task UpdateJsonAsync(string data);
    }
}
