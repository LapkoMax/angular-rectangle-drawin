using BusinessLogic.Services.Options;
using System.IO;
using System.Threading.Tasks;

namespace BusinessLogic.Services.Impl
{
    public class JsonService : IJsonService
    {
        public async Task<string> ReadJsonAsync()
        {
            string data = "";
            try
            {
                data = await File.ReadAllTextAsync(JsonOptions.FILE_NAME);

                if (string.IsNullOrWhiteSpace(data))
                {
                    throw new FileNotFoundException();
                }
            } catch(FileNotFoundException ex)
            {
                data = JsonOptions.DEFAULT_DATA;
            }

            return data;
        }

        public async Task UpdateJsonAsync(string data)
        {
            await File.WriteAllTextAsync(JsonOptions.FILE_NAME, string.IsNullOrWhiteSpace(data) ? JsonOptions.DEFAULT_DATA : data);
        }
    }
}
