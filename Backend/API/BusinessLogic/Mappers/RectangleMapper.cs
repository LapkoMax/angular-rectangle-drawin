using AutoMapper;
using Models.DTO;
using Models.Entities;

namespace BusinessLogic.Mappers
{
    public class RectangleMapper : Profile
    {
        public RectangleMapper()
        {
            CreateMap<Rectangle, RectangleDTO>();
            CreateMap<RectangleForCreationDTO, Rectangle>();
        }
    }
}
