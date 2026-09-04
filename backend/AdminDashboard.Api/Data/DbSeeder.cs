// backend/AdminDashboard.Api/Data/DbSeeder.cs
using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        // Don't seed if already has users
        if (context.Users.Any())
            return;

        // Create admin user
        var admin = new User
        {
            FullName = "Admin User",
            Email = "admin@admin.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            Role = UserRole.Admin,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        // Create regular users
        var users = new List<User>
        {
            admin,
            new User
            {
                FullName = "John Doe",
                Email = "john@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("John123!"),
                Role = UserRole.Member,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                FullName = "Jane Smith",
                Email = "jane@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Jane123!"),
                Role = UserRole.Member,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Users.AddRange(users);
        context.SaveChanges();
    }
}