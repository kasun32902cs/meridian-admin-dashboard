using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProjectsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetAll()
    {
        var projects = await _db.Projects
            .Include(p => p.Owner)
            .Include(p => p.Tasks)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProjectDto(
                p.Id, p.Name, p.Description, p.Status, p.CreatedAt, p.DueDate,
                p.OwnerId, p.Owner!.FullName, p.Tasks.Count))
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProjectDto>> GetById(int id)
    {
        var p = await _db.Projects.Include(x => x.Owner).Include(x => x.Tasks)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (p is null) return NotFound();

        return Ok(new ProjectDto(p.Id, p.Name, p.Description, p.Status, p.CreatedAt, p.DueDate,
            p.OwnerId, p.Owner!.FullName, p.Tasks.Count));
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> Create(CreateProjectRequest request)
    {
        var owner = await _db.Users.FindAsync(request.OwnerId);
        if (owner is null) return BadRequest(new { message = "Owner not found." });

        var project = new ProjectItem
        {
            Name = request.Name,
            Description = request.Description,
            OwnerId = request.OwnerId,
            DueDate = request.DueDate,
            Status = ProjectStatus.Planned
        };

        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = project.Id },
            new ProjectDto(project.Id, project.Name, project.Description, project.Status,
                project.CreatedAt, project.DueDate, owner.Id, owner.FullName, 0));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProjectDto>> Update(int id, UpdateProjectRequest request)
    {
        var p = await _db.Projects.Include(x => x.Owner).Include(x => x.Tasks)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (p is null) return NotFound();

        p.Name = request.Name;
        p.Description = request.Description;
        p.Status = request.Status;
        p.DueDate = request.DueDate;
        await _db.SaveChangesAsync();

        return Ok(new ProjectDto(p.Id, p.Name, p.Description, p.Status, p.CreatedAt, p.DueDate,
            p.OwnerId, p.Owner!.FullName, p.Tasks.Count));
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _db.Projects.FindAsync(id);
        if (p is null) return NotFound();

        _db.Projects.Remove(p);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
