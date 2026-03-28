using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusementApi.Data;
using MusementApi.Models;

namespace MusementApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToursController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<object>> GetTours(CancellationToken cancellationToken)
    {
        var response = await DataSeed.GetToursAsync(dbContext.Tours, Request.Query, cancellationToken);
        return Ok(response);
    }

    [HttpGet("filters")]
    public async Task<ActionResult<object>> GetFilters(CancellationToken cancellationToken)
    {
        var response = await DataSeed.GetFiltersAsync(dbContext.Tours, Request.Query, cancellationToken);
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetTour(int id, CancellationToken cancellationToken)
    {
        var tour = await DataSeed.GetTourByIdAsync(dbContext.Tours, id, cancellationToken);
        if (tour is null)
        {
            return NotFound();
        }

        return Ok(tour);
    }

    [HttpPost]
    public async Task<ActionResult<object>> CreateTour([FromBody] Tour tour, CancellationToken cancellationToken)
    {
        tour.Id = 0;
        DataSeed.NormalizeTour(tour);

        await dbContext.Tours.AddAsync(tour, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetTour), new { id = tour.Id }, DataSeed.ToTourResponse(tour));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<object>> UpdateTour(int id, [FromBody] Tour tour, CancellationToken cancellationToken)
    {
        var existingTour = await dbContext.Tours.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (existingTour is null)
        {
            return NotFound();
        }

        DataSeed.ApplyTourValues(existingTour, tour);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Ok(DataSeed.ToTourResponse(existingTour));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTour(int id, CancellationToken cancellationToken)
    {
        var tour = await dbContext.Tours.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (tour is null)
        {
            return NotFound();
        }

        dbContext.Tours.Remove(tour);
        await dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }
}
    
