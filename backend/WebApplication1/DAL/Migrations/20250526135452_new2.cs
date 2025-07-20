using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class new2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Purchases_PurchasesId",
                table: "Rentings");

            migrationBuilder.DropIndex(
                name: "IX_Rentings_PurchasesId",
                table: "Rentings");

            migrationBuilder.DropColumn(
                name: "PurchasesId",
                table: "Rentings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PurchasesId",
                table: "Rentings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rentings_PurchasesId",
                table: "Rentings",
                column: "PurchasesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Purchases_PurchasesId",
                table: "Rentings",
                column: "PurchasesId",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
