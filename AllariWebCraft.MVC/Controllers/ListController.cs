using AllariWebCraft.Service;
using Microsoft.AspNetCore.Mvc;

namespace AllariWebCraft.MVC.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ListController : ControllerBase
{
    private readonly IService _service;

    public ListController(IService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult Get() =>
        Ok(_service.GetItems());
}