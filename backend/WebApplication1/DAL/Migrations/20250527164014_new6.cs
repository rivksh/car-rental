using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class new6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Users_UserId",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_UserId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "UserId",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "UserId",
                table: "Rentings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_UserId",
                table: "Rentings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Users_UserId",
                table: "Rentings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
