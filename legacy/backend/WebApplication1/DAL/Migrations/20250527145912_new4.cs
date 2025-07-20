using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class new4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsersListId",
                table: "Rentings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_UsersListId",
                table: "Rentings",
                column: "UsersListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Users_UsersListId",
                table: "Rentings",
                column: "UsersListId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Users_UsersListId",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_UsersListId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "UsersListId",
                table: "Rentings");
        }
    }
}
