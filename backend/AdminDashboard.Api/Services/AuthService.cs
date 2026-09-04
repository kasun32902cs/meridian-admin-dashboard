using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly ITokenService _tokenService;

    public AuthService(AppDbContext db, ITokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user is null || !user.IsActive) return null;
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) return null;

        user.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var (token, expiresAt) = _tokenService.GenerateToken(user);
        return new AuthResponse(token, expiresAt, ToDto(user));
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        if (await _db.Users.AnyAsync(u => u.Email == request.Email))
            throw new InvalidOperationException("A user with this email already exists.");

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = UserRole.Member,
            IsActive = true
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var (token, expiresAt) = _tokenService.GenerateToken(user);
        return new AuthResponse(token, expiresAt, ToDto(user));
    }

    private static UserDto ToDto(User u) =>
        new(u.Id, u.FullName, u.Email, u.Role, u.IsActive, u.CreatedAt, u.LastLoginAt);
}
