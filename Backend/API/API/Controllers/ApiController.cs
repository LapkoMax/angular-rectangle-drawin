using DataAccess.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.Swagger;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly IRepositoryManager _repository;

        public ApiController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(RectangleDTO))]
        [SwaggerOperation(summary: "Get rectangle", OperationId = "GetRectangle")]
        public async Task<IActionResult> GetRectangle()
        {
            var rect = await _repository.Rectangle.GetRectangleAsync();

            if(rect == null)
            {
                return BadRequest();
            }

            return Ok(rect);
        }

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status204NoContent, Type = typeof(Response))]
        [SwaggerOperation(summary: "Save new rectangle", OperationId = "SaveRectangle")]
        public async Task<IActionResult> SaveRectangle(RectangleForCreationDTO rectangle)
        {
            await _repository.Rectangle.SaveRectangleAsync(rectangle);

            return NoContent();
        }
    }
}
