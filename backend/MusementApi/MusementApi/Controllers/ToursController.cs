using Microsoft.AspNetCore.Mvc;
using MusementApi.Data;

namespace MusementApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToursController : ControllerBase
{
    [HttpGet]
    public ActionResult<object> GetTours()
    {
        return Ok(DataSeed.Data);
    }

    [HttpGet("filters")]
    public ActionResult<object> GetFilters()
    {
        return Ok(DataSeed.Filters);
    }

    [HttpGet("{id:int}")]
    public ActionResult<object> GetTour(int id)
    {
        var tour = DataSeed.GetTourById(id);
        if (tour is null)
        {
            return NotFound();
        }

        return Ok(tour);
    }
}
