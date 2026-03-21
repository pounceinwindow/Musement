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
        return Ok(DataSeed.GetTours(Request.Query));
    }

    [HttpGet("filters")]
    public ActionResult<object> GetFilters()
    {
        return Ok(DataSeed.GetFilters(Request.Query));
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
    