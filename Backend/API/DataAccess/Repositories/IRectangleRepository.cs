using Models.DTO;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IRectangleRepository
    {
        Task<RectangleDTO> GetRectangleAsync();

        Task SaveRectangleAsync(RectangleForCreationDTO rectangle);
    }
}
