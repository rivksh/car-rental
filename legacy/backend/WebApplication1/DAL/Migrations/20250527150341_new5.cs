using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class new5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
