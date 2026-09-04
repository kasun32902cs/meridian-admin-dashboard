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
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _db;

    public DashboardController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryDto>> GetSummary()
    {
        var totalUsers = await _db.Users.CountAsync();
        var activeUsers = await _db.Users.CountAsync(u => u.IsActive);
        var totalProjects = await _db.Projects.CountAsync();
        var activeProjects = await _db.Projects.CountAsync(p => p.Status == ProjectStatus.Active);
        var totalTasks = await _db.Tasks.CountAsync();
        var tasksDone = await _db.Tasks.CountAsync(t => t.Status == WorkItemStatus.Done);
        var tasksOverdue = await _db.Tasks.CountAsync(t =>
            t.DueDate != null && t.DueDate < DateTime.UtcNow && t.Status != WorkItemStatus.Done);

        var statusBreakdown = await _db.Tasks
            .GroupBy(t => t.Status)
            .Select(g => new TaskStatusBreakdown(g.Key.ToString(), g.Count()))
            .ToListAsync();

        var recentTasks = await _db.Tasks
            .Include(t => t.Project)
            .OrderByDescending(t => t.CreatedAt)
            .Take(8)
            .Select(t => new RecentTaskDto(t.Id, t.Title, t.Project!.Name, t.Status.ToString(), t.CreatedAt))
            .ToListAsync();

        return Ok(new DashboardSummaryDto(
            totalUsers, activeUsers, totalProjects, activeProjects,
            totalTasks, tasksDone, tasksOverdue, statusBreakdown, recentTasks));
    }
}
