using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.Data;

// Seeds a default admin account and a little sample data so the dashboard
// isn't empty on first run. Runs once at startup if the Users table is empty.
public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Users.Any()) return;

        var admin = new User
        {
            FullName = "Alex Rivera",
            Email = "admin@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            Role = UserRole.Admin,
            IsActive = true
        };

        var manager = new User
        {
            FullName = "Jordan Lee",
            Email = "manager@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Manager123!"),
            Role = UserRole.Manager,
            IsActive = true
        };

        db.Users.AddRange(admin, manager);
        db.SaveChanges();

        var project = new ProjectItem
        {
            Name = "Website Relaunch",
            Description = "Redesign and rebuild the marketing site.",
            Status = ProjectStatus.Active,
            OwnerId = manager.Id,
            DueDate = DateTime.UtcNow.AddDays(30)
        };
        db.Projects.Add(project);
        db.SaveChanges();

        db.Tasks.AddRange(
            new TaskItem { Title = "Wireframe homepage", ProjectId = project.Id, AssigneeId = manager.Id, Priority = TaskPriority.High, Status = WorkItemStatus.InProgress, DueDate = DateTime.UtcNow.AddDays(3) },
            new TaskItem { Title = "Set up CI pipeline", ProjectId = project.Id, AssigneeId = admin.Id, Priority = TaskPriority.Medium, Status = WorkItemStatus.Todo, DueDate = DateTime.UtcNow.AddDays(7) },
            new TaskItem { Title = "Draft launch checklist", ProjectId = project.Id, AssigneeId = manager.Id, Priority = TaskPriority.Low, Status = WorkItemStatus.Todo, DueDate = DateTime.UtcNow.AddDays(14) }
        );
        db.SaveChanges();
    }
}
