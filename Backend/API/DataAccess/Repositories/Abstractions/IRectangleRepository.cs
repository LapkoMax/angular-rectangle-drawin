using Models.DTO;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Abstractions
{
    public interface IRectangleRepository
    {
        Task<RectangleDTO> GetRectangleAsync();

        Task SaveRectangleAsync(RectangleDTO rectangle);
    }
}
