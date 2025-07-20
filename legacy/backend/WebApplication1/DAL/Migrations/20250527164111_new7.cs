using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class new7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_UsersId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_UsersId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "Rentings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_UsersId",
                table: "Rentings",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Users_UsersId",
                table: "Rentings",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Users_UsersId",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_UsersId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "Rentings");

            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UsersId",
                table: "Users",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_UsersId",
                table: "Users",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
