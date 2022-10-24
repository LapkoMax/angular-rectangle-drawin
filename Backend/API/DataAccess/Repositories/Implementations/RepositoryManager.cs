using AutoMapper;
using BusinessLogic.Services.Abstractions;
using DataAccess.Repositories.Abstractions;

namespace DataAccess.Repositories.Implementations
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly IJsonService _jsonService;
        private readonly IMapper _mapper;

        public RepositoryManager(IJsonService jsonService, IMapper mapper)
        {
            _jsonService = jsonService;
            _mapper = mapper;
        }

        private IRectangleRepository _rectangleRepository;

        public IRectangleRepository Rectangle
        {
            get
            {
                if (_rectangleRepository == null)
                {
                    _rectangleRepository = new RectangleRepository(_jsonService, _mapper);
                }

                return _rectangleRepository;
            }
        }
    }
}
