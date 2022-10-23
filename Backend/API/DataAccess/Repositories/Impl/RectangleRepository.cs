using AutoMapper;
using BusinessLogic.Services;
using Models.DTO;
using Models.Entities;
using System.Text.Json;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Impl
{
    public class RectangleRepository : IRectangleRepository
    {
        private readonly IJsonService _jsonService;
        private readonly IMapper _mapper;

        public RectangleRepository(IJsonService jsonService, IMapper mapper)
        {
            _jsonService = jsonService;
            _mapper = mapper;
        }

        public async Task<RectangleDTO> GetRectangleAsync()
        {
            var data = await _jsonService.ReadJsonAsync();

            var rect = JsonSerializer.Deserialize<Rectangle>(data);

            return _mapper.Map<RectangleDTO>(rect);
        }

        public async Task SaveRectangleAsync(RectangleForCreationDTO rectangle)
        {
            var rect = _mapper.Map<Rectangle>(rectangle);

            var data = JsonSerializer.Serialize(rect);

            await _jsonService.UpdateJsonAsync(data);
        }
    }
}
