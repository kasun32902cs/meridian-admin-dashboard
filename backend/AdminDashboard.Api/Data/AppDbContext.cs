using AdminDashboard.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<ProjectItem> Projects => Set<ProjectItem>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.Role).HasConversion<string>();
        });

        modelBuilder.Entity<ProjectItem>(entity =>
        {
            entity.Property(p => p.Status).HasConversion<string>();
            entity.HasOne(p => p.Owner)
                  .WithMany(u => u.OwnedProjects)
                  .HasForeignKey(p => p.OwnerId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.Property(t => t.Priority).HasConversion<string>();
            entity.Property(t => t.Status).HasConversion<string>();

            entity.HasOne(t => t.Project)
                  .WithMany(p => p.Tasks)
                  .HasForeignKey(t => t.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(t => t.Assignee)
                  .WithMany(u => u.AssignedTasks)
                  .HasForeignKey(t => t.AssigneeId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
