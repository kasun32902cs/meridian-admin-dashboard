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
public class TasksController : ControllerBase
{
    private readonly AppDbContext _db;

    public TasksController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskDto>>> GetAll([FromQuery] int? projectId)
    {
        var query = _db.Tasks.Include(t => t.Project).Include(t => t.Assignee).AsQueryable();
        if (projectId.HasValue) query = query.Where(t => t.ProjectId == projectId.Value);

        var tasks = await query
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TaskDto(
                t.Id, t.Title, t.Notes, t.Priority, t.Status, t.CreatedAt, t.DueDate,
                t.ProjectId, t.Project!.Name, t.AssigneeId, t.Assignee != null ? t.Assignee.FullName : null))
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> Create(CreateTaskRequest request)
    {
        var project = await _db.Projects.FindAsync(request.ProjectId);
        if (project is null) return BadRequest(new { message = "Project not found." });

        var task = new TaskItem
        {
            Title = request.Title,
            Notes = request.Notes,
            Priority = request.Priority,
            ProjectId = request.ProjectId,
            AssigneeId = request.AssigneeId,
            DueDate = request.DueDate,
            Status = WorkItemStatus.Todo
        };

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        var assigneeName = request.AssigneeId.HasValue
            ? (await _db.Users.FindAsync(request.AssigneeId.Value))?.FullName
            : null;

        return CreatedAtAction(nameof(GetAll), new { },
            new TaskDto(task.Id, task.Title, task.Notes, task.Priority, task.Status, task.CreatedAt,
                task.DueDate, task.ProjectId, project.Name, task.AssigneeId, assigneeName));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TaskDto>> Update(int id, UpdateTaskRequest request)
    {
        var t = await _db.Tasks.Include(x => x.Project).Include(x => x.Assignee)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (t is null) return NotFound();

        t.Title = request.Title;
        t.Notes = request.Notes;
        t.Priority = request.Priority;
        t.Status = request.Status;
        t.AssigneeId = request.AssigneeId;
        t.DueDate = request.DueDate;
        await _db.SaveChangesAsync();

        var assigneeName = t.AssigneeId.HasValue
            ? (await _db.Users.FindAsync(t.AssigneeId.Value))?.FullName
            : null;

        return Ok(new TaskDto(t.Id, t.Title, t.Notes, t.Priority, t.Status, t.CreatedAt, t.DueDate,
            t.ProjectId, t.Project!.Name, t.AssigneeId, assigneeName));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var t = await _db.Tasks.FindAsync(id);
        if (t is null) return NotFound();

        _db.Tasks.Remove(t);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
