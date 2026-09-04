using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAll()
    {
        var users = await _db.Users
            .OrderBy(u => u.FullName)
            .Select(u => new UserDto(u.Id, u.FullName, u.Email, u.Role, u.IsActive, u.CreatedAt, u.LastLoginAt))
            .ToListAsync();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var u = await _db.Users.FindAsync(id);
        if (u is null) return NotFound();
        return Ok(new UserDto(u.Id, u.FullName, u.Email, u.Role, u.IsActive, u.CreatedAt, u.LastLoginAt));
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> Update(int id, UpdateUserRequest request)
    {
        var u = await _db.Users.FindAsync(id);
        if (u is null) return NotFound();

        u.FullName = request.FullName;
        u.Role = request.Role;
        u.IsActive = request.IsActive;
        await _db.SaveChangesAsync();

        return Ok(new UserDto(u.Id, u.FullName, u.Email, u.Role, u.IsActive, u.CreatedAt, u.LastLoginAt));
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var u = await _db.Users.FindAsync(id);
        if (u is null) return NotFound();

        _db.Users.Remove(u);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
