using AutoMapper;
using BusinessLogic.Services;

namespace DataAccess.Repositories.Impl
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
                if(_rectangleRepository == null)
                {
                    _rectangleRepository = new RectangleRepository(_jsonService, _mapper);
                }

                return _rectangleRepository;
            }
        }
    }
}
